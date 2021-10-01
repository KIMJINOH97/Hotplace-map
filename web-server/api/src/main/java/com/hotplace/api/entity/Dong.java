package com.hotplace.api.entity;

import com.hotplace.api.entity.Gu;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

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
    private Gu gu;
}
