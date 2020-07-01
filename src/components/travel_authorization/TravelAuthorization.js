import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import validate from './validate';
import { Form } from 'react-bootstrap';
import showResults from './showResults';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardTitle, MDBCol } from 'mdbreact';
import './TravelAuthorization.css';

const createRenderer = render => ({ input, meta, label, ...rest }) => (
	<MDBCol className="">
		<Form.Group>
			<Form.Label>{label}</Form.Label>

			{render(input, label, meta, rest)}
			{meta.error && meta.touched && (
				<span className="invalid-feedback">{`${label} ${
					meta.error
				}`}</span>
			)}
			{meta.valid && meta.touched && (
				<div className="valid-feedback">Looks good!</div>
			)}
		</Form.Group>
	</MDBCol>
);

const RenderInput = createRenderer((input, label, meta) => (
	<Form.Control {...input} placeholder={label} className={formValid(meta)} />
));

const RenderNumber = createRenderer((input, label, meta) => (
	<Form.Control
		{...input}
		type="number"
		placeholder={label}
		className={formValid(meta)}
	/>
));

const RenderDate = createRenderer((input, label, meta) => (
	<Form.Control
		{...input}
		type="date"
		placeholder={label}
		className={formValid(meta)}
	/>
));

const RenderTextarea = createRenderer((input, label, meta, rows) => (
	<Form.Control
		{...input}
		as="textarea"
		rows={rows}
		placeholder={label}
		className={formValid(meta)}
	/>
));

const RenderSelect = createRenderer((input, label, meta, { children }) => (
	<Form.Control {...input} as="select" className={formValid(meta)}>
		{children}
	</Form.Control>
));

const formValid = ({ touched, error, valid }) => {
	if (error && touched) {
		return 'is-invalid';
	}
	if (valid && touched) {
		return 'form-control is-valid';
	}
};

const renderItemizedExpenses = ({ fields }) => (
	<MDBCard>
		<MDBCardBody>
			<MDBCardTitle>Itemized Expenses</MDBCardTitle>
			{fields.map((expense, index) => (
				<MDBCol key={index}>
					<MDBCard>
						<MDBCardBody>
							<div
								className="d-flex justify-content-end mr-2"
								onClick={() => fields.remove(index)}
							>
								<button
									type="button"
									className="close"
									aria-label="Close"
								>
									<span aria-hidden="true">×</span>
								</button>
							</div>
							<MDBCardTitle>Entry #{index + 1}</MDBCardTitle>
							<Form.Row>
								<Field
									name={`${expense}.expenseDesc`}
									component={RenderInput}
									label="Expense Description"
								/>
								<Field
									component={RenderNumber}
									label={`Amount`}
									name={`${expense}.amount`}
								/>
							</Form.Row>
						</MDBCardBody>
					</MDBCard>
				</MDBCol>
			))}
			<Form.Row>
				<MDBCol className="d-flex justify-content-end">
					<Form.Group
						className="justify-content-end"
						controlId="split"
					>
						<MDBBtn onClick={() => fields.push({})}>
							Add Itemized Expense
						</MDBBtn>
					</Form.Group>
				</MDBCol>
			</Form.Row>
		</MDBCardBody>
	</MDBCard>
);

const renderBudgetSources = ({ fields }) => (
	<MDBCard>
		<MDBCardBody>
			<MDBCardTitle>Budget Sources</MDBCardTitle>
			{fields.map((budget, index) => (
				<MDBCol key={index}>
					<MDBCard>
						<MDBCardBody>
							<div
								className="d-flex justify-content-end mr-2"
								onClick={() => fields.remove(index)}
							>
								<button
									type="button"
									className="close"
									aria-label="Close"
								>
									<span aria-hidden="true">×</span>
								</button>
							</div>
							<MDBCardTitle>Entry #{index + 1}</MDBCardTitle>
							<Form.Row>
								<Field
									component={RenderSelect}
									label={`Department`}
									name={`${budget}.department`}
								>
									{' '}
									<option />
									<option>Computer Science</option>
									<option>Theatre</option>
									<option>English</option>
									<option>History</option>
									<option>Biology</option>
								</Field>
								<Field
									component={RenderSelect}
									label={`Budget Code`}
									name={`${budget}.budgetCode`}
								>
									{' '}
									<option />
									<option>ASDFCXFG</option>
									<option>MNHGDM</option>
									<option>GFDHDFGH</option>
									<option>XCZVXCZ</option>
									<option>VCXBNFG</option>
								</Field>
								<Field
									component={RenderNumber}
									label={`Amount`}
									name={`${budget}.amount`}
								/>
							</Form.Row>
						</MDBCardBody>
					</MDBCard>
				</MDBCol>
			))}
			<Form.Row>
				<MDBCol className="d-flex justify-content-end">
					<Form.Group
						className="justify-content-end"
						controlId="split"
					>
						<MDBBtn onClick={() => fields.push({})}>
							Add Budget Source
						</MDBBtn>
					</Form.Group>
				</MDBCol>
			</Form.Row>
		</MDBCardBody>
	</MDBCard>
);

const TravelAuthorization = props => {
	const { /*onClick,*/ reset, submitting } = props;
	return (
		<React.Fragment>
			<div className="container">
				<MDBCard>
					<MDBCardBody>
						<MDBCardTitle />
						<Form onSubmit={showResults}>
							<MDBCardTitle>Travel Authorization</MDBCardTitle>
							<MDBCard>
								<MDBCardBody>
									<MDBCardTitle>
										Travel Request Details
									</MDBCardTitle>
									<Field
										component={RenderInput}
										label="Destination"
										name={`destination`}
									/>
									<Field
										component={RenderDate}
										label="Leave Date"
										name={`leaveDate`}
									/>
									<Field
										component={RenderDate}
										label="Return Date"
										name={`returnDate`}
									/>
								</MDBCardBody>
							</MDBCard>
							<FieldArray
								name="itemizedExpenses"
								component={renderItemizedExpenses}
							/>
							<FieldArray
								name="budgetSources"
								component={renderBudgetSources}
							/>
						</Form>
					</MDBCardBody>
				</MDBCard>

				<MDBCard>
					<MDBCardTitle>Submit Form</MDBCardTitle>
					<MDBCardBody>
						<Field
							name="additionalComments"
							component={RenderTextarea}
							label="Commments"
							rows="3"
						/>
						<MDBCol className="d-flex justify-content-end mt-md-3">
							<MDBBtn type="submit" disabled={submitting}>
								Submit
							</MDBBtn>
							<MDBBtn
								type="MDBBtn"
								disabled={submitting}
								onClick={reset}
								variant="secondary"
							>
								Clear
							</MDBBtn>
							<MDBBtn variant="danger">Delete</MDBBtn>
						</MDBCol>
					</MDBCardBody>
				</MDBCard>
			</div>
		</React.Fragment>
	);
};

export default reduxForm({
	form: 'travelAuthorization', // a unique identifier for this form
	destroyOnUnmount: false,
	validate
})(TravelAuthorization);
