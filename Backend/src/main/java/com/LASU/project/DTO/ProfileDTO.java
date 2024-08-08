package com.LASU.project.DTO;


import com.LASU.project.Entity.Enum.AccountType;

public record ProfileDTO(

        String name,
        String faculty,
        String gender,
        String department,
        String organisation,
        String email,
        AccountType accountType
) {
}
