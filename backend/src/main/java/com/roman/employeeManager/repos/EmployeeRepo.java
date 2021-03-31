package com.roman.employeeManager.repos;

import com.roman.employeeManager.entities.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmployeeRepo extends JpaRepository<Employee, Integer> {

    @Override
    void deleteById(Integer integer);

    Optional<Employee> findEmployeeById(Integer id);
}
