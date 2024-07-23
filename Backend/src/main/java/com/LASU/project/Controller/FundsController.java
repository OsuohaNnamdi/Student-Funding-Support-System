package com.LASU.project.Controller;

import com.LASU.project.Entity.Funds;
import com.LASU.project.Exception.GeneralException;
import com.LASU.project.Service.FundsService;
import com.LASU.project.Service.Implementation.FundsImplementation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/v1/funds")
public class FundsController {

    private final FundsImplementation fundsImplementation;

    public FundsController(FundsImplementation fundsImplementation) {
        this.fundsImplementation = fundsImplementation;
    }

    @PostMapping
    public ResponseEntity<String> createFund(@RequestPart("fund") Funds fund,
                                             @RequestPart("logo") MultipartFile logo) {
        try {
            fundsImplementation.saveApplication(fund, logo);
            return ResponseEntity.ok("Fund created successfully");
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Failed to create fund: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateFund(@PathVariable Long id,
                                             @RequestPart("fund") Funds fundDetails,
                                             @RequestPart(value = "logo", required = false) MultipartFile logo) {
        try {
            fundsImplementation.updateFund(id, fundDetails, logo);
            return ResponseEntity.ok("Fund updated successfully");
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Failed to update fund: " + e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<Funds>> getAllFunds() {
        try {
            List<Funds> funds = fundsImplementation.findAllFunds();
            return ResponseEntity.ok(funds);
        } catch (IOException e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteFund(@PathVariable Long id) {
        try {
            fundsImplementation.deleteById(id);
            return ResponseEntity.ok("Fund deleted successfully");
        } catch (GeneralException e) {
            return ResponseEntity.status(500).body("Failed to delete fund: " + e.getMessage());
        }
    }
}
