package com.LASU.project.Service.Implementation;


import com.LASU.project.Entity.Funds;
import com.LASU.project.Exception.GeneralException;
import com.LASU.project.Repository.FundsRepository;
import com.LASU.project.Service.FundsService;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;


@Service
public class FundsImplementation implements FundsService {

    private final FundsRepository fundsRepository;


    public FundsImplementation(FundsRepository fundsRepository) {
        this.fundsRepository = fundsRepository;

    }

    @Override
    public void saveApplication(Funds request) throws IOException {


        fundsRepository.save(request);
    }

    @Override
    public void updateFund(Long id, Funds fundDetails) throws IOException {


        Funds existingFund = fundsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Fund not found"));

        existingFund.setName(fundDetails.getName());
        existingFund.setContact(fundDetails.getContact());
        existingFund.setAmount(fundDetails.getAmount());
        existingFund.setDescription(fundDetails.getDescription());



        fundsRepository.save(existingFund);
    }

    @Override
    public List<Funds> findAllFunds() throws IOException {
        try {
            return fundsRepository.findAll();
        } catch (GeneralException e) {
            throw new IOException("Error retrieving funds", e);
        }
    }

    @Override
    public void deleteById(Long id) throws GeneralException {

        fundsRepository.deleteById(id);
    }

}
