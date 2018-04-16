package pl.lh.expenses.web.rest;

import com.codahale.metrics.annotation.Timed;
import pl.lh.expenses.domain.CashAccount;
import pl.lh.expenses.service.CashAccountService;
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
 * REST controller for managing CashAccount.
 */
@RestController
@RequestMapping("/api")
public class CashAccountResource {

    private final Logger log = LoggerFactory.getLogger(CashAccountResource.class);

    private static final String ENTITY_NAME = "cashAccount";

    private final CashAccountService cashAccountService;

    public CashAccountResource(CashAccountService cashAccountService) {
        this.cashAccountService = cashAccountService;
    }

    /**
     * POST  /cash-accounts : Create a new cashAccount.
     *
     * @param cashAccount the cashAccount to create
     * @return the ResponseEntity with status 201 (Created) and with body the new cashAccount, or with status 400 (Bad Request) if the cashAccount has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/cash-accounts")
    @Timed
    public ResponseEntity<CashAccount> createCashAccount(@RequestBody CashAccount cashAccount) throws URISyntaxException {
        log.debug("REST request to save CashAccount : {}", cashAccount);
        if (cashAccount.getId() != null) {
            throw new BadRequestAlertException("A new cashAccount cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CashAccount result = cashAccountService.save(cashAccount);
        return ResponseEntity.created(new URI("/api/cash-accounts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /cash-accounts : Updates an existing cashAccount.
     *
     * @param cashAccount the cashAccount to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated cashAccount,
     * or with status 400 (Bad Request) if the cashAccount is not valid,
     * or with status 500 (Internal Server Error) if the cashAccount couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/cash-accounts")
    @Timed
    public ResponseEntity<CashAccount> updateCashAccount(@RequestBody CashAccount cashAccount) throws URISyntaxException {
        log.debug("REST request to update CashAccount : {}", cashAccount);
        if (cashAccount.getId() == null) {
            return createCashAccount(cashAccount);
        }
        CashAccount result = cashAccountService.save(cashAccount);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, cashAccount.getId().toString()))
            .body(result);
    }

    /**
     * GET  /cash-accounts : get all the cashAccounts.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of cashAccounts in body
     */
    @GetMapping("/cash-accounts")
    @Timed
    public List<CashAccount> getAllCashAccounts() {
        log.debug("REST request to get all CashAccounts");
        return cashAccountService.findAll();
        }

    /**
     * GET  /cash-accounts/:id : get the "id" cashAccount.
     *
     * @param id the id of the cashAccount to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the cashAccount, or with status 404 (Not Found)
     */
    @GetMapping("/cash-accounts/{id}")
    @Timed
    public ResponseEntity<CashAccount> getCashAccount(@PathVariable Long id) {
        log.debug("REST request to get CashAccount : {}", id);
        CashAccount cashAccount = cashAccountService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(cashAccount));
    }

    /**
     * DELETE  /cash-accounts/:id : delete the "id" cashAccount.
     *
     * @param id the id of the cashAccount to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/cash-accounts/{id}")
    @Timed
    public ResponseEntity<Void> deleteCashAccount(@PathVariable Long id) {
        log.debug("REST request to delete CashAccount : {}", id);
        cashAccountService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
