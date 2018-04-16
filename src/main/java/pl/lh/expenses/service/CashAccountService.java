package pl.lh.expenses.service;

import pl.lh.expenses.domain.CashAccount;
import pl.lh.expenses.repository.CashAccountRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service Implementation for managing CashAccount.
 */
@Service
@Transactional
public class CashAccountService {

    private final Logger log = LoggerFactory.getLogger(CashAccountService.class);

    private final CashAccountRepository cashAccountRepository;

    public CashAccountService(CashAccountRepository cashAccountRepository) {
        this.cashAccountRepository = cashAccountRepository;
    }

    /**
     * Save a cashAccount.
     *
     * @param cashAccount the entity to save
     * @return the persisted entity
     */
    public CashAccount save(CashAccount cashAccount) {
        log.debug("Request to save CashAccount : {}", cashAccount);
        return cashAccountRepository.save(cashAccount);
    }

    /**
     * Get all the cashAccounts.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<CashAccount> findAll() {
        log.debug("Request to get all CashAccounts");
        return cashAccountRepository.findAll();
    }

    /**
     * Get one cashAccount by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public CashAccount findOne(Long id) {
        log.debug("Request to get CashAccount : {}", id);
        return cashAccountRepository.findOne(id);
    }

    /**
     * Delete the cashAccount by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete CashAccount : {}", id);
        cashAccountRepository.delete(id);
    }
}
