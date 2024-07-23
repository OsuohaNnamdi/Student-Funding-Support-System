package com.LASU.project.Controller;

import com.LASU.project.Entity.Sponsorship;
import com.LASU.project.Exception.GeneralException;
import com.LASU.project.Service.Implementation.SponsorshipImplementation;
import com.LASU.project.Service.SponsorshipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/sponsorships")
public class SponsorshipController {

    private final SponsorshipImplementation sponsorshipImplementation;


    public SponsorshipController(SponsorshipImplementation sponsorshipImplementation) {
        this.sponsorshipImplementation = sponsorshipImplementation;
    }

    @PostMapping
    public ResponseEntity<String> createSponsorship(@RequestBody Sponsorship sponsorship) {
        try {
            sponsorshipImplementation.saveSponsorship(sponsorship);
            return ResponseEntity.ok("Sponsorship created successfully");
        } catch (GeneralException e) {
            return ResponseEntity.status(500).body("Failed to create sponsorship: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateSponsorship(@PathVariable Long id,
                                                    @RequestBody Sponsorship sponsorshipDetails) {
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
