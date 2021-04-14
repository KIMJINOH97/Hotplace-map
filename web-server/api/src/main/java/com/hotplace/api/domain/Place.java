package com.hotplace.api.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
public class Place {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "place_id")
    private Long id;
    private String name;
    //private String longitude_x;
    //private String latitude_y;
    private String address;

    // 'Dong' 테이블과 N:1 관계
    @ManyToOne
    @JoinColumn(name = "gu_id")
    @JsonIgnore
    private Gu gu;

    @ManyToOne
    @JoinColumn(name = "dong_id")
    @JsonIgnore
    private Dong dong;
}
