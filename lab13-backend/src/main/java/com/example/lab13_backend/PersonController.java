package com.example.lab13_backend; 
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

@RestController
@RequestMapping("/api/people")
@CrossOrigin(origins = "http://localhost:4200") 
public class PersonController {

    private List<Person> people = new ArrayList<>();
    private AtomicLong counter = new AtomicLong();

    public PersonController() {
        Person p = new Person();
        p.setId(counter.incrementAndGet());
        p.setFirstName("Startowa");
        p.setFamilyName("Osoba");
        p.setAge(99);
        p.setAddress(new Address("Warszawa", "Wiejska", "00-001"));
        people.add(p);
    }

    @GetMapping
    public List<Person> getAll() {
        return people;
    }

    @PostMapping
    public Person add(@RequestBody Person person) {
        person.setId(counter.incrementAndGet());
        people.add(person);
        return person;
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        people.removeIf(p -> p.getId().equals(id));
    }

    @GetMapping("/{id}")
    public Person getOne(@PathVariable Long id) {
        return people.stream().filter(p -> p.getId().equals(id)).findFirst().orElse(null);
    }

    public static class Person {
        private Long id;
        private String firstName;
        private String familyName;
        private Integer age;
        private Address address; 

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getFirstName() { return firstName; }
        public void setFirstName(String firstName) { this.firstName = firstName; }
        public String getFamilyName() { return familyName; }
        public void setFamilyName(String familyName) { this.familyName = familyName; }
        public Integer getAge() { return age; }
        public void setAge(Integer age) { this.age = age; }
        public Address getAddress() { return address; }
        public void setAddress(Address address) { this.address = address; }
    }

    public static class Address {
        public String city;
        public String street;
        public String postCode;

        public Address() {}
        public Address(String city, String street, String postCode) {
            this.city = city;
            this.street = street;
            this.postCode = postCode;
        }
    }
}