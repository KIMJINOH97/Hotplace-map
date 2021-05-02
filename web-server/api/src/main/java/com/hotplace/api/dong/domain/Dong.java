package com.hotplace.api.dong.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.hotplace.api.gu.domain.Gu;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Getter
@NoArgsConstructor
@Table(name = "DONG")
@Entity
public class Dong {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "dong_id")
    private Integer id;

    @Column(name = "dong_name")
    private String name;

    @ManyToOne @JoinColumn(name = "gu_id")
    @JsonIgnore
    private Gu gu;
}
