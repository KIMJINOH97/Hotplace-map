package com.hotplace.api.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;

import javax.persistence.*;
import java.util.List;

@Getter
@Entity
public class Dong {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "dong_id")
    private Long id;
    private String name;

    @ManyToOne
    @JoinColumn(name = "gu_id")
    @JsonIgnore
    private Gu gu;

    @OneToMany(mappedBy = "dong")
    private List<Place> places;
}
