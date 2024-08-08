package com.LASU.project.Repository;

import com.LASU.project.Entity.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ApplicationRepository extends JpaRepository<Application, Long>
{

    @Query("SELECT b FROM Application b WHERE b.email = :email")
    List<Application> findByEmail(@Param("email") String email);
}
