/*
 * Taken from bookbrainz-site.
 * Copyright (C) 2017  Ben Ockmore
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
 */

// @flow

import {get, validateDate, validatePositiveInteger} from './base';
import {
	validateAliases, validateIdentifiers, validateNameSection,
	validateSubmissionSection
} from './common';
import _ from 'lodash';
import type {_IdentifierType} from './types';


export function validatePublisherSectionArea(value: any): boolean {
	if (!value) {
		return true;
	}

	return validatePositiveInteger(get(value, 'id', null), true);
}

export function validatePublisherSectionBeginDate(value: any): boolean {
	return validateDate(value);
}

export function validatePublisherSectionEndDate(value: any): boolean {
	return validateDate(value);
}

export function validatePublisherSectionEnded(value: any): boolean {
	return _.isNull(value) || _.isBoolean(value);
}

export function validatePublisherSectionType(value: any): boolean {
	return validatePositiveInteger(value);
}


export function validatePublisherSection(data: any): boolean {
	return (
		validatePublisherSectionArea(get(data, 'area', null)) &&
		validatePublisherSectionBeginDate(get(data, 'beginDate', null)) &&
		validatePublisherSectionEndDate(get(data, 'endDate', null)) &&
		validatePublisherSectionEnded(get(data, 'ended', null)) &&
		validatePublisherSectionType(get(data, 'type', null))
	);
}

export function validateForm(
	formData: any, identifierTypes?: ?Array<_IdentifierType>
): boolean {
	const conditions = [
		validateAliases(get(formData, 'aliasSection', {})),
		validateIdentifiers(
			get(formData, 'identifierSection', {}), identifierTypes
		),
		validateNameSection(get(formData, 'nameSection', {})),
		validatePublisherSection(get(formData, 'publisherSection', {})),
		validateSubmissionSection(get(formData, 'submissionSection', {}))
	];

	return _.every(conditions);
}
