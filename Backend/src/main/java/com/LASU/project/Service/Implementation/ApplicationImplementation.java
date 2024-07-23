package com.LASU.project.Service.Implementation;

import com.LASU.project.Entity.Application;
import com.LASU.project.Exception.GeneralException;
import com.LASU.project.Repository.ApplicationRepository;
import com.LASU.project.Service.ApplicationService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

@Service
public class ApplicationImplementation implements ApplicationService {

    private final ApplicationRepository applicationRepository;

    public ApplicationImplementation(ApplicationRepository applicationRepository) {
        this.applicationRepository = applicationRepository;
    }



    @Override
    public void saveApplication(Application application, MultipartFile documents, MultipartFile document2) throws IOException {

        String documentPath = saveFile(documents);
        String document2Path = saveFile(document2);

        application.setDocuments(documentPath);
        application.setDocument2(document2Path);

        applicationRepository.save(application);

    }

    private String saveFile(MultipartFile file) throws IOException {


        String directory = "C:\\Users\\Lenovo\\Desktop\\Project\\sallys\\store";
        Path filePath = Paths.get(directory + file.getOriginalFilename());
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        return filePath.toString();
    }

    @Override
    public void deleteById(Long id) throws GeneralException {

        applicationRepository.deleteById(id);
    }

    @Override
    public List<Application> findAllApplication() throws GeneralException {
        return applicationRepository.findAll();

    }

}
