package com.LASU.project.Service;



import com.LASU.project.Entity.Sponsorship;
import com.LASU.project.Exception.GeneralException;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface SponsorshipService {

    void  saveSponsorship(Sponsorship sponsorship, MultipartFile logo) throws GeneralException, IOException;

    void updateSponsorship(Long id, Sponsorship updatedSponsorship) throws GeneralException;

    List<Sponsorship> findAllSponsorships()  throws GeneralException;

    Sponsorship findSponsorshipById(Long id) throws GeneralException;

    void deleteSponsorship(Long id) throws GeneralException;
}
