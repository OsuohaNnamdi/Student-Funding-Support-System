package com.LASU.project.Entity;


import jakarta.persistence.*;

@Entity
@Table(name = "sponsorship")
public class Sponsorship {
    @Id
    @SequenceGenerator(
            name = "sponsorship_sequence",
            sequenceName = "sponsorship_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "sponsorship_sequence")
    private Long id;
    private String donorName;
    private String email;
    private int numStudents;
    private double totalAmount;
    private String paymentMethod;
    private String comments;



    public Sponsorship() {
    }

    public Sponsorship(Long id, String donorName, String email, int numStudents, double totalAmount, String paymentMethod, String comments) {
        this.id = id;
        this.donorName = donorName;
        this.email = email;
        this.numStudents = numStudents;
        this.totalAmount = totalAmount;
        this.paymentMethod = paymentMethod;
        this.comments = comments;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDonorName() {
        return donorName;
    }

    public void setDonorName(String donorName) {
        this.donorName = donorName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getNumStudents() {
        return numStudents;
    }

    public void setNumStudents(int numStudents) {
        this.numStudents = numStudents;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }
}