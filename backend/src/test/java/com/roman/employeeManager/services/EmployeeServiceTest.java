package com.roman.employeeManager.services;

import com.roman.employeeManager.entities.Employee;
import com.roman.employeeManager.repos.EmployeeRepo;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class EmployeeServiceTest {

    @MockBean
    EmployeeRepo employeeRepo;

    @Test
    public void addEmployeeTest(){
        Employee employee = new Employee("Vasya", "vasya@mail.ru", "666-666-6666",
                "cleaner", "image-url", "1234");

        Mockito.when(employeeRepo.save(employee)).thenReturn(employee);
        Employee genEmployee = employeeRepo.save(employee);
        Assert.assertEquals("Vasya", genEmployee.getName());
    }
}
