package com.LASU.project.Service.Implementation;


import com.LASU.project.Entity.Application;
import com.LASU.project.Entity.Funds;
import com.LASU.project.Exception.GeneralException;
import com.LASU.project.Repository.FundsRepository;
import com.LASU.project.Service.FundsService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;


@Service
public class FundsImplementation implements FundsService {

    private final FundsRepository fundsRepository;

    public FundsImplementation(FundsRepository fundsRepository) {
        this.fundsRepository = fundsRepository;
    }



      @Override
    public void saveApplication(Funds request, MultipartFile documents) throws IOException {

        String logo = saveLogo(documents);

        request.setLogo(logo);

        fundsRepository.save(request);
    }

    @Override
    public void updateFund(Long id, Funds fundDetails, MultipartFile documents) throws IOException {


        Funds existingFund = fundsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Fund not found"));

        existingFund.setName(fundDetails.getName());
        existingFund.setContact(fundDetails.getContact());
        existingFund.setAmount(fundDetails.getAmount());
        existingFund.setDescription(fundDetails.getDescription());

        if (documents != null && !documents.isEmpty()) {
            String logoPath = saveLogo(documents);
            existingFund.setLogo(logoPath);
        }

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



    private String saveLogo(MultipartFile logo) throws IOException {
    try {
        String directory = "C:\\Users\\Lenovo\\Desktop\\Project\\sallys\\store";
        Path path = Paths.get(directory + logo.getOriginalFilename());
        Files.createDirectories(path.getParent()); // Create directories if they don't exist
        logo.transferTo(path);
        return path.toString();
    } catch (GeneralException e) {
        throw new GeneralException("Failed to save logo");

    }
    }
}
