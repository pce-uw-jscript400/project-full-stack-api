const errors = {
    missingCompany : id => `Unit ${id} is currently unoccupied`,
    missingUnit : id => `No unit matching id: ${id}`,
    missingEmployee : id => `No employee found with id: ${id}`
}

module.exports = errors