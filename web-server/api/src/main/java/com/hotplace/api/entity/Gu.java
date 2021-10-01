package com.hotplace.api.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Getter
@NoArgsConstructor
@Table (name = "GU")
@Entity
public class Gu {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "gu_id")
    private Integer id;

    @Column(name = "gu_name")
    private String name;

}
