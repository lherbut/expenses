package pl.lh.expenses.repository;

import pl.lh.expenses.domain.CashAccount;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the CashAccount entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CashAccountRepository extends JpaRepository<CashAccount, Long> {

}
