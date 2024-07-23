package com.LASU.project.Controller;

import com.LASU.project.Entity.Application;
import com.LASU.project.Exception.GeneralException;
import com.LASU.project.Service.ApplicationService;
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

    @PostMapping
    public ResponseEntity<String> createApplication(@RequestPart("application") Application application,
                                                    @RequestPart("documents") MultipartFile documents,
                                                    @RequestPart("document2") MultipartFile document2) {
        try {
            applicationImplementation.saveApplication(application, documents, document2);
            return ResponseEntity.ok("Application created successfully");
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Failed to create application: " + e.getMessage());
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

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteApplication(@PathVariable Long id) {
        try {
            applicationImplementation.deleteById(id);
            return ResponseEntity.ok("Application deleted successfully");
        } catch (GeneralException e) {
            return ResponseEntity.status(500).body("Failed to delete application: " + e.getMessage());
        }
    }
}
