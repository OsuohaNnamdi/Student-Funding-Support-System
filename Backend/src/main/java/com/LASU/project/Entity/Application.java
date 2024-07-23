package com.LASU.project.Entity;

import jakarta.persistence.*;

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
            private Boolean verify;
            private Boolean approved;
            private String documents;


            private String document2;

    public Application(Long id, String name, String email, String guardianName, String gpa, String matricNo, boolean enrolled, String financialNeed, String statement, Boolean seen, Boolean verify, Boolean approved, String documents, String document2) {
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
        this.verify = verify;
        this.approved = approved;
        this.documents = documents;
        this.document2 = document2;
    }

    public Application() {
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

    public Boolean getApproved() {
        return approved;
    }

    public void setApproved(Boolean approved) {
        this.approved = approved;
    }

    public String getDocuments() {
        return documents;
    }

    public void setDocuments(String documents) {
        this.documents = documents;
    }

    public String getDocument2() {
        return document2;
    }

    public void setDocument2(String document2) {
        this.document2 = document2;
    }
}