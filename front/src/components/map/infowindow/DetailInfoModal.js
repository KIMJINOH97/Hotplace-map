import React, { useState } from 'react';
import { Modal, Button, Descriptions, Tag, List } from 'antd';

const DetailInfoModal = ({ place }) => {

    const {
        id,
        name,
        address,
        phone_number,
        kakao_url,
        naver_url,
        instagram_url,
        homepage_url,
        instagram_hashtag,
        kakao_star,
        naver_star,
        naver_blog_review_count,
        naver_buyer_review_count
    } = place;

    const [visible, setVisible] = useState(false);
    return (
        <>
            <Button type="primary" onClick={() => setVisible(true)}>
                상세보기
            </Button>
            <Modal
                centered
                visible={visible}
                onOk={() => setVisible(false)}
                onCancel={() => setVisible(false)}
                width={1000}
            >
                <Descriptions title="상세보기" layout="vertical" bordered>
                    <Descriptions.Item label="가게 이름">{name}</Descriptions.Item>
                    <Descriptions.Item label="전화 번호">{phone_number}</Descriptions.Item>
                    <Descriptions.Item label="홈페이지 주소">
                        <a href={homepage_url} rel="noreferrer" target="_blank">
                            {homepage_url}
                        </a>
                    </Descriptions.Item>
                    <Descriptions.Item label="주소" span={3}>
                        {address}
                    </Descriptions.Item>
                    {naver_star && <Descriptions.Item label="네이버 별점">{naver_star}</Descriptions.Item>}
                    {naver_blog_review_count && <Descriptions.Item label="네이버 블로그 리뷰수">{naver_blog_review_count}</Descriptions.Item>}
                    {naver_buyer_review_count && <Descriptions.Item label="네이버 구매자 리뷰수">{naver_buyer_review_count}</Descriptions.Item>}
                    {kakao_star && <Descriptions.Item label="카카오 별점" >{kakao_star}</Descriptions.Item>}
                    {instagram_hashtag && <Descriptions.Item label="인스타그램 해시태그수" span={2} >{instagram_hashtag}</Descriptions.Item>}
                    <Descriptions.Item label="바로가기 링크" span={3} >
                        <List>
                            {naver_url &&
                                <List.Item>
                                    <div><Tag color="green">Naver</Tag> <a href={naver_url} rel="noreferrer" target="_blank">{naver_url}</a> </div>
                                </List.Item>}
                            {kakao_url && <List.Item>
                                <div><Tag color="gold">Kakao</Tag> <a href={kakao_url} rel="noreferrer" target="_blank">{kakao_url}</a> </div>
                            </List.Item>}
                            {instagram_url && <List.Item>
                                <div><Tag color="purple">Instagram</Tag> <a href={instagram_url} rel="noreferrer" target="_blank">{instagram_url}</a> </div>
                            </List.Item>}
                        </List>
                    </Descriptions.Item>
                </Descriptions>
            </Modal>
        </>
    );
};

export default DetailInfoModal;