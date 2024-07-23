package com.LASU.project.Service;


import com.LASU.project.Entity.LoginRequest;
import com.LASU.project.Entity.LoginResponse;
import com.LASU.project.Entity.Profile;
import com.LASU.project.Exception.ProfileException;

public interface ProfileService {

    void addStudent (Profile profile) throws ProfileException;

    LoginResponse login(LoginRequest request) throws ProfileException;
}
