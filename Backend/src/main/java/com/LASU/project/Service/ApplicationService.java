package com.LASU.project.Service;

import com.LASU.project.Entity.Application;
import com.LASU.project.Exception.GeneralException;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface ApplicationService {

    void saveApplication(Application application, MultipartFile documents, MultipartFile document2) throws IOException;

    void deleteById (Long id) throws GeneralException;

    List<Application> findAllApplication() throws GeneralException;
}
