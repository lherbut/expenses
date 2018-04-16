package pl.lh.expenses.service;

import pl.lh.expenses.domain.Expense;
import pl.lh.expenses.repository.ExpenseRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service Implementation for managing Expense.
 */
@Service
@Transactional
public class ExpenseService {

    private final Logger log = LoggerFactory.getLogger(ExpenseService.class);

    private final ExpenseRepository expenseRepository;

    public ExpenseService(ExpenseRepository expenseRepository) {
        this.expenseRepository = expenseRepository;
    }

    /**
     * Save a expense.
     *
     * @param expense the entity to save
     * @return the persisted entity
     */
    public Expense save(Expense expense) {
        log.debug("Request to save Expense : {}", expense);
        return expenseRepository.save(expense);
    }

    /**
     * Get all the expenses.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<Expense> findAll() {
        log.debug("Request to get all Expenses");
        return expenseRepository.findAll();
    }

    /**
     * Get one expense by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Expense findOne(Long id) {
        log.debug("Request to get Expense : {}", id);
        return expenseRepository.findOne(id);
    }

    /**
     * Delete the expense by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Expense : {}", id);
        expenseRepository.delete(id);
    }
}
