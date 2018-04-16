package pl.lh.expenses.web.rest;

import pl.lh.expenses.ExpensesApp;

import pl.lh.expenses.domain.CashAccount;
import pl.lh.expenses.repository.CashAccountRepository;
import pl.lh.expenses.service.CashAccountService;
import pl.lh.expenses.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static pl.lh.expenses.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the CashAccountResource REST controller.
 *
 * @see CashAccountResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ExpensesApp.class)
public class CashAccountResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private CashAccountRepository cashAccountRepository;

    @Autowired
    private CashAccountService cashAccountService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCashAccountMockMvc;

    private CashAccount cashAccount;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CashAccountResource cashAccountResource = new CashAccountResource(cashAccountService);
        this.restCashAccountMockMvc = MockMvcBuilders.standaloneSetup(cashAccountResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CashAccount createEntity(EntityManager em) {
        CashAccount cashAccount = new CashAccount()
            .name(DEFAULT_NAME);
        return cashAccount;
    }

    @Before
    public void initTest() {
        cashAccount = createEntity(em);
    }

    @Test
    @Transactional
    public void createCashAccount() throws Exception {
        int databaseSizeBeforeCreate = cashAccountRepository.findAll().size();

        // Create the CashAccount
        restCashAccountMockMvc.perform(post("/api/cash-accounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cashAccount)))
            .andExpect(status().isCreated());

        // Validate the CashAccount in the database
        List<CashAccount> cashAccountList = cashAccountRepository.findAll();
        assertThat(cashAccountList).hasSize(databaseSizeBeforeCreate + 1);
        CashAccount testCashAccount = cashAccountList.get(cashAccountList.size() - 1);
        assertThat(testCashAccount.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createCashAccountWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = cashAccountRepository.findAll().size();

        // Create the CashAccount with an existing ID
        cashAccount.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCashAccountMockMvc.perform(post("/api/cash-accounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cashAccount)))
            .andExpect(status().isBadRequest());

        // Validate the CashAccount in the database
        List<CashAccount> cashAccountList = cashAccountRepository.findAll();
        assertThat(cashAccountList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllCashAccounts() throws Exception {
        // Initialize the database
        cashAccountRepository.saveAndFlush(cashAccount);

        // Get all the cashAccountList
        restCashAccountMockMvc.perform(get("/api/cash-accounts?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cashAccount.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }

    @Test
    @Transactional
    public void getCashAccount() throws Exception {
        // Initialize the database
        cashAccountRepository.saveAndFlush(cashAccount);

        // Get the cashAccount
        restCashAccountMockMvc.perform(get("/api/cash-accounts/{id}", cashAccount.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(cashAccount.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCashAccount() throws Exception {
        // Get the cashAccount
        restCashAccountMockMvc.perform(get("/api/cash-accounts/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCashAccount() throws Exception {
        // Initialize the database
        cashAccountService.save(cashAccount);

        int databaseSizeBeforeUpdate = cashAccountRepository.findAll().size();

        // Update the cashAccount
        CashAccount updatedCashAccount = cashAccountRepository.findOne(cashAccount.getId());
        // Disconnect from session so that the updates on updatedCashAccount are not directly saved in db
        em.detach(updatedCashAccount);
        updatedCashAccount
            .name(UPDATED_NAME);

        restCashAccountMockMvc.perform(put("/api/cash-accounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCashAccount)))
            .andExpect(status().isOk());

        // Validate the CashAccount in the database
        List<CashAccount> cashAccountList = cashAccountRepository.findAll();
        assertThat(cashAccountList).hasSize(databaseSizeBeforeUpdate);
        CashAccount testCashAccount = cashAccountList.get(cashAccountList.size() - 1);
        assertThat(testCashAccount.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingCashAccount() throws Exception {
        int databaseSizeBeforeUpdate = cashAccountRepository.findAll().size();

        // Create the CashAccount

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCashAccountMockMvc.perform(put("/api/cash-accounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cashAccount)))
            .andExpect(status().isCreated());

        // Validate the CashAccount in the database
        List<CashAccount> cashAccountList = cashAccountRepository.findAll();
        assertThat(cashAccountList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteCashAccount() throws Exception {
        // Initialize the database
        cashAccountService.save(cashAccount);

        int databaseSizeBeforeDelete = cashAccountRepository.findAll().size();

        // Get the cashAccount
        restCashAccountMockMvc.perform(delete("/api/cash-accounts/{id}", cashAccount.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<CashAccount> cashAccountList = cashAccountRepository.findAll();
        assertThat(cashAccountList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CashAccount.class);
        CashAccount cashAccount1 = new CashAccount();
        cashAccount1.setId(1L);
        CashAccount cashAccount2 = new CashAccount();
        cashAccount2.setId(cashAccount1.getId());
        assertThat(cashAccount1).isEqualTo(cashAccount2);
        cashAccount2.setId(2L);
        assertThat(cashAccount1).isNotEqualTo(cashAccount2);
        cashAccount1.setId(null);
        assertThat(cashAccount1).isNotEqualTo(cashAccount2);
    }
}
