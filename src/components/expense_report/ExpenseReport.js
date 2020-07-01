import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import validate from './validate';
import { Form } from 'react-bootstrap';
import {
	MDBBtn,
	MDBCard,
	MDBCardBody,
	MDBCardTitle,
	MDBCol,
	MDBContainer
} from 'mdbreact';
import './ExpenseReport.css';

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

const renderSplitExpenses = ({ fields }) => (
	<MDBCard>
		<MDBCardBody>
			<MDBCardTitle>Split Expenses</MDBCardTitle>
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
							<MDBCardTitle>
								Split Entry #{index + 1}
							</MDBCardTitle>
							<Form.Row>
								<Field
									name={`${expense}.expenseDesc`}
									component={RenderInput}
									label="Expense Description"
								/>
								<Field
									name={`${expense}.expenseType`}
									component={RenderSelect}
									label="Expense Type"
								>
									<option />
									<option>Hotel</option>
									<option>Food</option>
									<option>Gas/Fuel</option>
									<option>Air Travel</option>
									<option>Vehicle</option>
								</Field>
							</Form.Row>
							<FieldArray
								name={`${expense}.entries`}
								component={renderSplitEntries}
							/>
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
							Add Split Expense
						</MDBBtn>
					</Form.Group>
				</MDBCol>
			</Form.Row>
		</MDBCardBody>
	</MDBCard>
);

const renderSplitEntries = ({ fields, meta: { error } }) => (
	<div>
		<MDBBtn onClick={() => fields.push()}>Add Entry</MDBBtn>
		{fields.map((entry, index) => (
			<div key={index}>
				<div
					className="d-flex justify-content-end"
					onClick={() => fields.remove(index)}
				>
					<button type="button" className="close" aria-label="Close">
						<span aria-hidden="true">×</span>
					</button>
				</div>
				<Form.Row>
					<Field
						component={RenderNumber}
						label={`Amount`}
						name={`${entry}.amount`}
					/>
					<Field
						component={RenderSelect}
						label={`Department`}
						name={`${entry}.department`}
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
						name={`${entry}.budgetCode`}
					>
						{' '}
						<option />
						<option>ASDFCXFG</option>
						<option>MNHGDM</option>
						<option>GFDHDFGH</option>
						<option>XCZVXCZ</option>
						<option>VCXBNFG</option>
					</Field>
				</Form.Row>
			</div>
		))}
		{error && <li className="error">{error}</li>}
	</div>
);

const renderCombinedExpenses = ({ fields }) => (
	<MDBCard>
		<MDBCardBody>
			<MDBCardTitle>Combined Expenses</MDBCardTitle>
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
							<MDBCardTitle>
								Combined Entry #{index + 1}
							</MDBCardTitle>
							<Form.Row>
								<Field
									component={RenderNumber}
									label={`Amount`}
									name={`${expense}.amount`}
								/>
								<Field
									component={RenderSelect}
									label={`Department`}
									name={`${expense}.department`}
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
									name={`${expense}.budgetCode`}
								>
									{' '}
									<option />
									<option>ASDFCXFG</option>
									<option>MNHGDM</option>
									<option>GFDHDFGH</option>
									<option>XCZVXCZ</option>
									<option>VCXBNFG</option>
								</Field>
							</Form.Row>

							<FieldArray
								name={`${expense}.entries`}
								component={renderCombinedEntries}
							/>
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
							Add Combined Expense
						</MDBBtn>
					</Form.Group>
				</MDBCol>
			</Form.Row>
		</MDBCardBody>
	</MDBCard>
);

const renderCombinedEntries = ({ fields, meta: { error } }) => (
	<div>
		<MDBBtn onClick={() => fields.push()}>Add Entry</MDBBtn>
		{fields.map((entry, index) => (
			<div key={index}>
				<div
					className="d-flex justify-content-end"
					onClick={() => fields.remove(index)}
				>
					<button type="button" className="close" aria-label="Close">
						<span aria-hidden="true">×</span>
					</button>
				</div>
				<Form.Row>
					<Field
						name={`${entry}.expenseDesc`}
						component={RenderInput}
						label="Expense Description"
					/>
					<Field
						name={`${entry}.expenseType`}
						component={RenderSelect}
						label="Expense Type"
					>
						<option />
						<option>Hotel</option>
						<option>Food</option>
						<option>Gas/Fuel</option>
						<option>Air Travel</option>
						<option>Vehicle</option>
					</Field>
					<Field
						component={RenderNumber}
						label={`Amount`}
						name={`${entry}.amount`}
					/>
				</Form.Row>
			</div>
		))}
		{error && <li className="error">{error}</li>}
	</div>
);

const showResults = data => {};

const ExpenseReport = props => {
	const { handleSubmit, pristine, reset, submitting } = props;
	return (
		<React.Fragment>
			<MDBContainer>
				<Form onSubmit={handleSubmit}>
					<MDBCard>
						<MDBCardBody>
							<MDBCardTitle>Expense Report</MDBCardTitle>

							<FieldArray
								name="splitExpenses"
								component={renderSplitExpenses}
							/>
							<FieldArray
								name="combinedExpenses"
								component={renderCombinedExpenses}
							/>
						</MDBCardBody>
					</MDBCard>
					<MDBCard>
						<MDBCardBody>
							<MDBCardTitle>Submit Form</MDBCardTitle>

							<Field
								name="additionalComments"
								component={RenderTextarea}
								label="Commments"
								rows="3"
							/>
							<MDBCol className="d-flex justify-content-end mt-md-3">
								<MDBBtn
									type="submit"
									color="primary"
									disabled={submitting}
									onClick={showResults}
								>
									Submit
								</MDBBtn>
								<MDBBtn
									type="MDBBtn"
									color="warning"
									disabled={submitting}
									onClick={reset}
									variant="secondary"
								>
									Clear
								</MDBBtn>
								<MDBBtn color="danger" variant="danger">
									Delete
								</MDBBtn>
							</MDBCol>
						</MDBCardBody>
					</MDBCard>
				</Form>
			</MDBContainer>
		</React.Fragment>
	);
};

export default reduxForm({
	form: 'expenseReport', // a unique identifier for this form
	destroyOnUnmount: false,
	validate
})(ExpenseReport);
