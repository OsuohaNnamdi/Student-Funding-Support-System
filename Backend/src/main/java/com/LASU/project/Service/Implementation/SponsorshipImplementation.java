package com.LASU.project.Service.Implementation;

import com.LASU.project.Entity.Sponsorship;
import com.LASU.project.Exception.GeneralException;
import com.LASU.project.Repository.SponsorshipRepository;
import com.LASU.project.Service.CloudinaryService;
import com.LASU.project.Service.SponsorshipService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;
import java.util.List;

@Service
public class SponsorshipImplementation implements SponsorshipService {



    private final SponsorshipRepository sponsorshipRepository;
    private final CloudinaryService cloudinaryService;

    public SponsorshipImplementation(SponsorshipRepository sponsorshipRepository, CloudinaryService cloudinaryService) {
        this.sponsorshipRepository = sponsorshipRepository;
        this.cloudinaryService = cloudinaryService;
    }

    @Override
    public void  saveSponsorship(Sponsorship sponsorship , MultipartFile logo) throws GeneralException, IOException {



        String response = cloudinaryService.uploadImage(logo);
        sponsorship.setFile(response);
        sponsorshipRepository.save(sponsorship);
    }

    @Override
    public void updateSponsorship(Long id, Sponsorship request) throws GeneralException {

        Sponsorship sponsorship = sponsorshipRepository.findById(id).orElseThrow(() -> new GeneralException("Sponsorship with id "+id+" is not present"));

        if (sponsorship != null){


            sponsorship.setDonorName(request.getDonorName());
            sponsorship.setEmail(request.getEmail());
            sponsorship.setNumStudents(request.getNumStudents());
            sponsorship.setTotalAmount(request.getTotalAmount());

            sponsorship.setComments(request.getComments());

            sponsorshipRepository.save(sponsorship);
        }
    }

    @Override
    public List<Sponsorship> findAllSponsorships() throws GeneralException {

        try {
            return sponsorshipRepository.findAll();
        }catch (GeneralException e){
            throw new GeneralException("Error in fetching file"+e);
        }
    }



    @Override
    public Sponsorship findSponsorshipById(Long id) throws GeneralException {
        return sponsorshipRepository.findById(id).orElseThrow(() ->
                new GeneralException("Sponsorship with id "+id+" is not present"));
    }

    @Override
    public void deleteSponsorship(Long id) throws GeneralException {

        sponsorshipRepository.deleteById(id);
    }
}
