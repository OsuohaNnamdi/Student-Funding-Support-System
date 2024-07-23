package com.LASU.project.Service;

import com.LASU.project.Entity.Application;
import com.LASU.project.Entity.Funds;
import com.LASU.project.Exception.GeneralException;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface FundsService {

    void saveApplication(Funds funds, MultipartFile documents) throws IOException;

    void  updateFund(Long id, Funds fundDetails, MultipartFile documents) throws IOException;

    List<Funds> findAllFunds()throws IOException;

    void deleteById (Long id) throws GeneralException;
}
