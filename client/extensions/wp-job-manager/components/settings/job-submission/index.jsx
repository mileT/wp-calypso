/**
 * External dependencies
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormSection, formValueSelector, reduxForm } from 'redux-form';
import { localize } from 'i18n-calypso';
import { flowRight } from 'lodash';

/**
 * Internal dependencies
 */
import Card from 'components/card';
import FormButton from 'components/forms/form-button';
import FormFieldset from 'components/forms/form-fieldset';
import FormLabel from 'components/forms/form-label';
import FormSettingExplanation from 'components/forms/form-setting-explanation';
import ReduxFormRadio from 'components/redux-forms/redux-form-radio';
import ReduxFormSelect from 'components/redux-forms/redux-form-select';
import ReduxFormTextInput from 'components/redux-forms/redux-form-text-input';
import ReduxFormToggle from 'components/redux-forms/redux-form-toggle';
import SectionHeader from 'components/section-header';

class JobSubmission extends Component {
	static propTypes = {
		enableRegistration: PropTypes.bool,
		handleSubmit: PropTypes.func,
		isDisabled: PropTypes.bool,
		isSaving: PropTypes.bool,
		onSubmit: PropTypes.func,
		translate: PropTypes.func,
	};

	save = section => data => this.props.onSubmit( data[ section ] );

	render() {
		const {
			enableRegistration,
			handleSubmit,
			isDisabled,
			isSaving,
			submissionDuration,
			translate,
		} = this.props;

		return (
			<div>
				<form>
					<FormSection name="account">
						<SectionHeader label={ translate( 'Account' ) }>
							<FormButton compact
								disabled={ isDisabled }
								isSubmitting={ isSaving }
								onClick={ handleSubmit( this.save( 'account' ) ) } />
						</SectionHeader>
						<Card>
							<FormFieldset>
								<ReduxFormToggle
									disabled={ isDisabled }
									name="isAccountRequired"
									text={ translate( 'Require an account to submit listings' ) } />
								<FormSettingExplanation isIndented>
									{ translate( 'Limits job listing submissions to registered, logged-in users.' ) }
								</FormSettingExplanation>

								<ReduxFormToggle
									disabled={ isDisabled }
									name="generateUsername"
									text="Generate usernames from email addresses" />
								<FormSettingExplanation isIndented>
									{ translate( 'Automatically generates usernames for new accounts from the registrant\'s ' +
										'email address. If this is not enabled, a "username" field will display instead.' ) }
								</FormSettingExplanation>

								<ReduxFormToggle
									disabled={ isDisabled }
									name="enableRegistration"
									text={ translate( 'Enable account creation during submission' ) } />
								<FormSettingExplanation isIndented>
									{ translate( 'Includes account creation on the listing submission form, to allow ' +
										'non-registered users to create an account and submit a job listing simultaneously.' ) }
								</FormSettingExplanation>
							</FormFieldset>

							{ enableRegistration &&
								<FormFieldset>
									<FormLabel>
										{ translate( 'Role' ) }
									</FormLabel>
									<ReduxFormSelect
										disabled={ isDisabled }
										name="role">
										<option value="editor">{ translate( 'Editor' ) }</option>
										<option value="author">{ translate( 'Author' ) }</option>
										<option value="contributor">{ translate( 'Contributor' ) }</option>
										<option value="subscriber">{ translate( 'Subscriber' ) }</option>
										<option value="teacher">{ translate( 'Teacher' ) }</option>
										<option value="employer">{ translate( 'Employer' ) }</option>
										<option value="customer">{ translate( 'Customer' ) }</option>
										<option value="shop_manager">{ translate( 'Shop manager' ) }</option>
									</ReduxFormSelect>
									<FormSettingExplanation>
										{ translate( 'Any new accounts created during submission will have this role. ' +
											'If you haven\'t enabled account creation during submission in the options above, ' +
											'your own method of assigning roles will apply.' ) }
									</FormSettingExplanation>
								</FormFieldset>
							}
						</Card>
					</FormSection>
				</form>

				<form>
					<FormSection name="approval">
						<SectionHeader label={ translate( 'Approval' ) }>
							<FormButton compact
								disabled={ isDisabled }
								isSubmitting={ isSaving }
								onClick={ handleSubmit( this.save( 'approval' ) ) } />
						</SectionHeader>
						<Card>
							<FormFieldset>
								<ReduxFormToggle
									disabled={ isDisabled }
									name="isApprovalRequired"
									text={ translate( 'Require admin approval of all new listing submissions' ) } />
								<FormSettingExplanation isIndented>
									{ translate( 'Sets all new submissions to "pending." They will not appear on your ' +
										'site until an admin approves them.' ) }
								</FormSettingExplanation>

								<ReduxFormToggle
									disabled={ isDisabled }
									name="canEdit"
									text="Allow editing of pending listings" />
								<FormSettingExplanation isIndented>
									{ translate( 'Users can continue to edit pending listings until they are approved by an admin.' ) }
								</FormSettingExplanation>
							</FormFieldset>
						</Card>
					</FormSection>
				</form>

				<form>
					<FormSection name="duration">
						<SectionHeader label={ translate( 'Listing Duration' ) }>
							<FormButton compact
								disabled={ isDisabled }
								isSubmitting={ isSaving }
								onClick={ handleSubmit( this.save( 'duration' ) ) } />
						</SectionHeader>
						<Card>
							<FormFieldset>
								{ translate(
									'Display listings for {{days /}} day',
									'Display listings for {{days /}} days',
									{
										count: submissionDuration,
										components: {
											days:
												<ReduxFormTextInput
													disabled={ isDisabled }
													min="0"
													name="submissionDuration"
													step="1"
													type="number" />
										}
									}
								) }
								<FormSettingExplanation>
									{ translate( 'Listings will display for the set number of days, then expire. ' +
										'Leave this field blank if you don\'t want listings to have an expiration date.' ) }
								</FormSettingExplanation>
							</FormFieldset>
						</Card>
					</FormSection>
				</form>

				<form>
					<FormSection name="method">
						<SectionHeader label={ translate( 'Application Method' ) }>
							<FormButton compact
								disabled={ isDisabled }
								isSubmitting={ isSaving }
								onClick={ handleSubmit( this.save( 'method' ) ) } />
						</SectionHeader>
						<Card>
							<FormFieldset>
								<FormSettingExplanation>
									{ translate( 'Choose the application method job listers will need to provide. ' +
										'Specify URL or email address only, or allow listers to choose which they prefer.' ) }
								</FormSettingExplanation>
								<FormLabel>
									<ReduxFormRadio
										disabled={ isDisabled }
										name="applicationMethod"
										value="" />
									<span>
										{ translate( 'Email address or website URL' ) }
									</span>
								</FormLabel>

								<FormLabel>
									<ReduxFormRadio
										disabled={ isDisabled }
										name="applicationMethod"
										value="email" />
									<span>
										{ translate( 'Email addresses only' ) }
									</span>
								</FormLabel>

								<FormLabel>
									<ReduxFormRadio
										disabled={ isDisabled }
										name="applicationMethod"
										value="url" />
									<span>
										{ translate( 'Website URLs only' ) }
									</span>
								</FormLabel>
							</FormFieldset>
						</Card>
					</FormSection>
				</form>
			</div>
		);
	}
}

const connectComponent = connect(
	( state ) => {
		const selector = formValueSelector( 'wpJobManager.submission', () => state.ui.form );

		return {
			enableRegistration: selector( state, 'account.enableRegistration' ),
			submissionDuration: selector( state, 'duration.submissionDuration' ),
		};
	}
);

const createReduxForm = reduxForm( {
	enableReinitialize: true,
	form: 'wpJobManager.submission',
	getFormState: state => state.ui.form,
} );

export default flowRight(
	connectComponent,
	localize,
	createReduxForm,
)( JobSubmission );
