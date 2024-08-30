package com.LASU.project.Controller;

import com.LASU.project.Entity.Sponsorship;
import com.LASU.project.Exception.GeneralException;
import com.LASU.project.Service.Implementation.SponsorshipImplementation;
import com.LASU.project.Service.SponsorshipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/v1/sponsorships")
public class SponsorshipController {

    private final SponsorshipImplementation sponsorshipImplementation;


    public SponsorshipController(SponsorshipImplementation sponsorshipImplementation) {
        this.sponsorshipImplementation = sponsorshipImplementation;
    }

    @PostMapping("/add")
    public ResponseEntity<?> createSponsorship(
            @ModelAttribute Sponsorship sponsorship,
            @RequestPart("document") MultipartFile document) {
        try {
            sponsorshipImplementation.saveSponsorship(sponsorship, document);
            return new ResponseEntity<>("Sponsorship saved successfully", HttpStatus.CREATED);
        }  catch (GeneralException | IOException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateSponsorship(@PathVariable Long id,
                                                    @ModelAttribute Sponsorship sponsorshipDetails) {
        try {
            sponsorshipImplementation.updateSponsorship(id, sponsorshipDetails);
            return ResponseEntity.ok("Sponsorship updated successfully");
        } catch (GeneralException e) {
            return ResponseEntity.status(500).body("Failed to update sponsorship: " + e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<Sponsorship>> getAllSponsorships() {
        try {
            List<Sponsorship> sponsorships = sponsorshipImplementation.findAllSponsorships();
            return ResponseEntity.ok(sponsorships);
        } catch (GeneralException e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Sponsorship> getSponsorshipById(@PathVariable Long id) {
        try {
            Sponsorship sponsorship = sponsorshipImplementation.findSponsorshipById(id);
            return ResponseEntity.ok(sponsorship);
        } catch (GeneralException e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteSponsorship(@PathVariable Long id) {
        try {
            sponsorshipImplementation.deleteSponsorship(id);
            return ResponseEntity.ok("Sponsorship deleted successfully");
        } catch (GeneralException e) {
            return ResponseEntity.status(500).body("Failed to delete sponsorship: " + e.getMessage());
        }
    }
}
