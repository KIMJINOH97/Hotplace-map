package com.hotplace.api.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Table (name = "SUB_CATEGORY")
@Entity
public class SubCategory {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sub_category_id")
    private Integer id;
    private String name;

    @ManyToOne @JoinColumn (name = "category_id")
    private Category category;
}
