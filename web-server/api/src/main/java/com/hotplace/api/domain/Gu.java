package com.hotplace.api.domain;

import javax.persistence.*;
import java.util.List;

@Entity
public class Gu {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "gu_id")
    private Long id;
    private String name;

    @OneToMany(mappedBy = "gu")
    private List<Place> places;

    @OneToMany(mappedBy = "gu")
    private List<Dong> dong;
}
