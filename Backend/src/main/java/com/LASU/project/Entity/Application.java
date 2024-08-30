package com.LASU.project.Entity;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "Application")
public class Application {

    @Id
    @SequenceGenerator(
            name = "Application_sequence",
            sequenceName = "Application_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "Application_sequence")
            private Long id;
            private String name;
            private String email;
            private String guardianName;
            private String gpa;
            private String matricNo;
            private boolean enrolled;
            private String financialNeed;
            private String statement;
            private Boolean seen;
            private String companyName;
            private String companyImage;
            private LocalDate applicationDate;
            private Boolean verify;
            private Boolean approved;
            private String status;
            private String pdf;
            private String file1;

    public Application() {
    }


    public Application(Long id, String name, String email, String guardianName, String gpa, String matricNo, boolean enrolled, String financialNeed, String statement, Boolean seen, String companyName, String companyImage, LocalDate applicationDate, Boolean verify, Boolean approved, String status, String pdf, String file1) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.guardianName = guardianName;
        this.gpa = gpa;
        this.matricNo = matricNo;
        this.enrolled = enrolled;
        this.financialNeed = financialNeed;
        this.statement = statement;
        this.seen = seen;
        this.companyName = companyName;
        this.companyImage = companyImage;
        this.applicationDate = applicationDate;
        this.verify = verify;
        this.approved = approved;
        this.status = status;
        this.pdf = pdf;
        this.file1 = file1;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getGuardianName() {
        return guardianName;
    }

    public void setGuardianName(String guardianName) {
        this.guardianName = guardianName;
    }

    public String getGpa() {
        return gpa;
    }

    public void setGpa(String gpa) {
        this.gpa = gpa;
    }

    public String getMatricNo() {
        return matricNo;
    }

    public void setMatricNo(String matricNo) {
        this.matricNo = matricNo;
    }

    public boolean isEnrolled() {
        return enrolled;
    }

    public void setEnrolled(boolean enrolled) {
        this.enrolled = enrolled;
    }

    public String getFinancialNeed() {
        return financialNeed;
    }

    public void setFinancialNeed(String financialNeed) {
        this.financialNeed = financialNeed;
    }

    public String getStatement() {
        return statement;
    }

    public void setStatement(String statement) {
        this.statement = statement;
    }

    public Boolean getSeen() {
        return seen;
    }

    public void setSeen(Boolean seen) {
        this.seen = seen;
    }

    public Boolean getVerify() {
        return verify;
    }

    public void setVerify(Boolean verify) {
        this.verify = verify;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getCompanyImage() {
        return companyImage;
    }

    public void setCompanyImage(String companyImage) {
        this.companyImage = companyImage;
    }

    public LocalDate getApplicationDate() {
        return applicationDate;
    }

    public void setApplicationDate(LocalDate applicationDate) {
        this.applicationDate = applicationDate;
    }

    public Boolean getApproved() {
        return approved;
    }

    public void setApproved(Boolean approved) {
        this.approved = approved;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getPdf() {
        return pdf;
    }

    public void setPdf(String pdf) {
        this.pdf = pdf;
    }

    public String getFile1() {
        return file1;
    }

    public void setFile1(String file1) {
        this.file1 = file1;
    }
}