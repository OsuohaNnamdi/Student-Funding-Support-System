package com.LASU.project.Controller;

import com.LASU.project.Entity.Application;
import com.LASU.project.Exception.GeneralException;
import com.LASU.project.Service.ApplicationService;
import org.springframework.http.HttpStatus;
import com.LASU.project.Service.Implementation.ApplicationImplementation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/v1/applications")
public class ApplicationController {

    private final ApplicationImplementation applicationImplementation;

    public ApplicationController(ApplicationImplementation applicationImplementation) {
        this.applicationImplementation = applicationImplementation;
    }

    @PostMapping("/add")
    public ResponseEntity<?> createApplication(
            @ModelAttribute Application application,
            @RequestPart("documents") MultipartFile documents,
            @RequestPart("document2") MultipartFile document2) {
        try {
            applicationImplementation.saveApplication(application, documents, document2);
            return ResponseEntity.ok("Application created successfully");
    } catch (GeneralException | IOException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
   }


    @PutMapping("/approve/{id}")
    public ResponseEntity<?> approveApplication(@PathVariable Long id) {
        try {
            applicationImplementation.approveApplication(id);
            return ResponseEntity.ok("Application approved successfully");
        } catch (GeneralException e) {
            return ResponseEntity.status(500).body("Failed to approve application: " + e.getMessage());
        }
    }
    
    @PutMapping("/reject/{id}")
    public ResponseEntity<?> rejectApplication(@PathVariable Long id) {
        try {
            applicationImplementation.rejectApplication(id);
            return ResponseEntity.ok("Application rejected successfully");
    } catch (GeneralException e) {
        return ResponseEntity.status(500).body("Failed to reject application: " + e.getMessage());
      }
    }


    @GetMapping
    public ResponseEntity<List<Application>> getAllApplications() {
        try {
            List<Application> applications = applicationImplementation.findAllApplication();
            return ResponseEntity.ok(applications);
        } catch (GeneralException e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    @GetMapping("/{request}")
    public ResponseEntity<List<?>> getAllByEmail(@PathVariable String request) {
        try {
            List<Application> applications = applicationImplementation.findByEmail(request);
            return ResponseEntity.ok(applications);
        } catch (GeneralException e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteApplication(@PathVariable Long id) {
        try {
            applicationImplementation.deleteById(id);
            return ResponseEntity.ok("Application deleted successfully");
        } catch (GeneralException e) {
            return ResponseEntity.status(500).body("Failed to delete application: " + e.getMessage());
        }
    }
}
