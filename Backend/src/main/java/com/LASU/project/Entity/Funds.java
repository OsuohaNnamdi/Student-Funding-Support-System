package com.LASU.project.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "Funds")
public class Funds {

    @Id
    @SequenceGenerator(
            name = "Funds_sequence",
            sequenceName = "Funds_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "Funds_sequence")
    private Long id;
    private String name;
    private String contact;
    private String amount;
    private String description;
    private String logo;

    public Funds() {
    }

    public Funds(String name, String contact, String amount, String description, String logo) {
        this.name = name;
        this.contact = contact;
        this.amount = amount;
        this.description = description;
        this.logo = logo;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

    public String getAmount() {
        return amount;
    }

    public void setAmount(String amount) {
        this.amount = amount;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLogo() {
        return logo;
    }

    public void setLogo(String logo) {
        this.logo = logo;
    }
}
