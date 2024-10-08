package com.LASU.project.Service.Implementation;

import com.LASU.project.Entity.Application;
import com.LASU.project.Exception.GeneralException;
import com.LASU.project.Repository.ApplicationRepository;
import com.LASU.project.Service.ApplicationService;
import com.LASU.project.Service.CloudinaryService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

@Service
public class ApplicationImplementation implements ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final CloudinaryService cloudinaryService;

    public ApplicationImplementation(ApplicationRepository applicationRepository, CloudinaryService cloudinaryService) {
        this.applicationRepository = applicationRepository;
        this.cloudinaryService = cloudinaryService;
    }

    @Override
    public void saveApplication(Application application, MultipartFile document1, MultipartFile document2) throws GeneralException, IOException {


        String response = cloudinaryService.uploadImage(document1);
        String response1 = cloudinaryService.uploadImage(document2);

        application.setPdf(response);
        application.setFile1(response1);
        application.setStatus("Pending");
        application.setApplicationDate(LocalDate.now());
        applicationRepository.save(application);

    }

    @Override
    public void deleteById(Long id) throws GeneralException {

        applicationRepository.deleteById(id);
    }

    @Override
    public List<Application> findAllApplication() throws GeneralException {
        return applicationRepository.findAll();

    }
    @Override
    public List<Application> findByEmail(String request) throws GeneralException {
        return applicationRepository.findByEmail(request);

    }

    @Override
    public void approveApplication(Long id) {
        
        Application application = applicationRepository.findById(id)
            .orElseThrow(() -> new GeneralException("Application Not Found"));
        application.setApproved(true);
        application.setStatus("Accepted");
        applicationRepository.save(application);
        
    }
    @Override
    public void rejectApplication(Long id) {
        
        Application application = applicationRepository.findById(id)
            .orElseThrow(() -> new GeneralException("Application Not Found"));
        application.setApproved(false);
        application.setStatus("Rejected");
        applicationRepository.save(application);
        
    }

}
