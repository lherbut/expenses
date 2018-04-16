package pl.lh.expenses.web.rest;

import com.codahale.metrics.annotation.Timed;
import pl.lh.expenses.domain.Expense;
import pl.lh.expenses.service.ExpenseService;
import pl.lh.expenses.web.rest.errors.BadRequestAlertException;
import pl.lh.expenses.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Expense.
 */
@RestController
@RequestMapping("/api")
public class ExpenseResource {

    private final Logger log = LoggerFactory.getLogger(ExpenseResource.class);

    private static final String ENTITY_NAME = "expense";

    private final ExpenseService expenseService;

    public ExpenseResource(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }

    /**
     * POST  /expenses : Create a new expense.
     *
     * @param expense the expense to create
     * @return the ResponseEntity with status 201 (Created) and with body the new expense, or with status 400 (Bad Request) if the expense has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/expenses")
    @Timed
    public ResponseEntity<Expense> createExpense(@RequestBody Expense expense) throws URISyntaxException {
        log.debug("REST request to save Expense : {}", expense);
        if (expense.getId() != null) {
            throw new BadRequestAlertException("A new expense cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Expense result = expenseService.save(expense);
        return ResponseEntity.created(new URI("/api/expenses/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /expenses : Updates an existing expense.
     *
     * @param expense the expense to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated expense,
     * or with status 400 (Bad Request) if the expense is not valid,
     * or with status 500 (Internal Server Error) if the expense couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/expenses")
    @Timed
    public ResponseEntity<Expense> updateExpense(@RequestBody Expense expense) throws URISyntaxException {
        log.debug("REST request to update Expense : {}", expense);
        if (expense.getId() == null) {
            return createExpense(expense);
        }
        Expense result = expenseService.save(expense);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, expense.getId().toString()))
            .body(result);
    }

    /**
     * GET  /expenses : get all the expenses.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of expenses in body
     */
    @GetMapping("/expenses")
    @Timed
    public List<Expense> getAllExpenses() {
        log.debug("REST request to get all Expenses");
        return expenseService.findAll();
        }

    /**
     * GET  /expenses/:id : get the "id" expense.
     *
     * @param id the id of the expense to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the expense, or with status 404 (Not Found)
     */
    @GetMapping("/expenses/{id}")
    @Timed
    public ResponseEntity<Expense> getExpense(@PathVariable Long id) {
        log.debug("REST request to get Expense : {}", id);
        Expense expense = expenseService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(expense));
    }

    /**
     * DELETE  /expenses/:id : delete the "id" expense.
     *
     * @param id the id of the expense to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/expenses/{id}")
    @Timed
    public ResponseEntity<Void> deleteExpense(@PathVariable Long id) {
        log.debug("REST request to delete Expense : {}", id);
        expenseService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
