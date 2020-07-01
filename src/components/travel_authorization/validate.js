const validate = values => {
	const errors = {};
	if (!values.destination) {
		errors.destination = 'Required';
	}
	if (!values.leaveDate) {
		errors.leaveDate = 'Required';
	}
	if (!values.returnDate) {
		errors.returnDate = 'Required';
	}

	// Itemized Expenses
	if (values.itemizedExpenses && values.itemizedExpenses.length) {
		const itemizedArrayErrors = [];
		values.itemizedExpenses.forEach((expense, expenseIndex) => {
			const expenseErrors = {};

			if (!expense || !expense.expenseDesc) {
				expenseErrors.expenseDesc = 'Required';
				itemizedArrayErrors[expenseIndex] = expenseErrors;
			}
			if (!expense || !expense.amount) {
				expenseErrors.amount = 'Required';
				itemizedArrayErrors[expenseIndex] = expenseErrors;
			}
			return expenseErrors;
		});
		if (itemizedArrayErrors.length) {
			errors.itemizedExpenses = itemizedArrayErrors;
		}
	}

	// Budget Sources
	if (values.budgetSources && values.budgetSources.length) {
		const budgetSourcesArrayErrors = [];
		values.budgetSources.forEach((budget, expenseIndex) => {
			const budgetErrors = {};

			if (!budget || !budget.department) {
				budgetErrors.department = 'Required';
				budgetSourcesArrayErrors[expenseIndex] = budgetErrors;
			}
			if (!budget || !budget.budgetCode) {
				budgetErrors.budgetCode = 'Required';
				budgetSourcesArrayErrors[expenseIndex] = budgetErrors;
			}
			if (!budget || !budget.amount) {
				budgetErrors.amount = 'Required';
				budgetSourcesArrayErrors[expenseIndex] = budgetErrors;
			}
			return budgetErrors;
		});
		if (budgetSourcesArrayErrors.length) {
			errors.budgetSources = budgetSourcesArrayErrors;
		}
	}

	return errors;
};

export default validate;
