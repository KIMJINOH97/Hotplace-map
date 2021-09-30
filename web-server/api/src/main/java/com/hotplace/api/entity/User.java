package com.hotplace.api.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Table(name = "USER")
@NoArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class User extends BaseTimeEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Integer id;

    private String name;

    private String email;

    private String provider;

    private String providerId;

    @OneToMany(mappedBy = "user")
    private List<Favorite> favorites = new ArrayList<>();

}
