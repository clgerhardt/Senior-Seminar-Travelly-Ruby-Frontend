const validate = values => {
	const errors = {};

	// Split Expenses
	if (values.splitExpenses && values.splitExpenses.length) {
		const splitArrayErrors = [];
		const splitEntriesArrayErrors = [];
		values.splitExpenses.forEach((expense, expenseIndex) => {
			const expenseErrors = {};

			if (!expense || !expense.expenseDesc) {
				expenseErrors.expenseDesc = 'Required';
				splitArrayErrors[expenseIndex] = expenseErrors;
			}
			if (!expense || !expense.expenseType) {
				expenseErrors.expenseType = 'Required';
				splitArrayErrors[expenseIndex] = expenseErrors;
			}

			if (expense.entries && expense.entries.length) {
				expense.entries.forEach((entry, entryIndex) => {
					const entryErrors = {};

					if (!entry || !entry.amount) {
						entryErrors.amount = 'Required';
						splitEntriesArrayErrors[entryIndex] = entryErrors;
					}
					if (!entry || !entry.department) {
						entryErrors.department = 'Required';
						splitEntriesArrayErrors[entryIndex] = entryErrors;
					}
					if (!entry || !entry.budgetCode) {
						entryErrors.budgetCode = 'Required';
						splitEntriesArrayErrors[entryIndex] = entryErrors;
					}

					return entryErrors;
				});
				if (splitEntriesArrayErrors.length) {
					// At the index of this EXPENSE create an entries array and add errors
					splitArrayErrors[
						expenseIndex
					].entries = splitEntriesArrayErrors;
				}
			}

			return expenseErrors;
		});
		if (splitArrayErrors.length) {
			errors.splitExpenses = splitArrayErrors;
		}
	}

	// Combined Expenses
	if (values.combinedExpenses && values.combinedExpenses.length) {
		const combinedArrayErrors = [];
		const combinedEntriesArrayErrors = [];
		values.combinedExpenses.forEach((expense, expenseIndex) => {
			const combinedErrors = {};

			if (!expense || !expense.amount) {
				combinedErrors.amount = 'Required';
				combinedArrayErrors[expenseIndex] = combinedErrors;
			}
			if (!expense || !expense.department) {
				combinedErrors.department = 'Required';
				combinedArrayErrors[expenseIndex] = combinedErrors;
			}
			if (!expense || !expense.budgetCode) {
				combinedErrors.budgetCode = 'Required';
				combinedArrayErrors[expenseIndex] = combinedErrors;
			}

			if (expense.entries && expense.entries.length) {
				expense.entries.forEach((entry, entryIndex) => {
					const entryErrors = {};

					if (!entry || !entry.expenseDesc) {
						entryErrors.expenseDesc = 'Required';
						combinedEntriesArrayErrors[entryIndex] = entryErrors;
					}
					if (!entry || !entry.expenseType) {
						entryErrors.expenseType = 'Required';
						combinedEntriesArrayErrors[entryIndex] = entryErrors;
					}
					if (!entry || !entry.amount) {
						entryErrors.amount = 'Required';
						combinedEntriesArrayErrors[entryIndex] = entryErrors;
					}

					return entryErrors;
				});
				if (combinedEntriesArrayErrors.length) {
					// At the index of this EXPENSE create an entries array and add errors
					combinedArrayErrors[
						expenseIndex
					].entries = combinedEntriesArrayErrors;
				}
			}

			return combinedErrors;
		});
		if (combinedArrayErrors.length) {
			errors.combinedExpenses = combinedArrayErrors;
		}
	}

	return errors;
};

export default validate;
