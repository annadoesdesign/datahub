import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { PageTitle, Button } from '@src/alchemy-components';
import { Plus } from 'phosphor-react';
import { PostList } from './PostsList';
import CreatePostModal from './CreatePostModal';
import { PostEntry } from './PostsListColumns';
import { useListPostsQuery } from '../../../graphql/post.generated';
import { addToListPostCache } from './utils';

const PageContainer = styled.div`
    padding: 16px 20px 16px 20px;
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow: auto;
    gap: 16px;
`;

const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const ListContainer = styled.div`
    display: flex;
    flex-direction: column;
    overflow: auto;
`;

export default function ManagePosts() {
    const [isCreatingPost, setIsCreatingPost] = useState(false);
    const [editData, setEditData] = useState<PostEntry | undefined>(undefined);

    const { refetch, client } = useListPostsQuery({
        variables: {
            input: {
                start: 0,
                count: 10,
            },
        },
    });

    const handleEdit = (post: PostEntry) => {
        setEditData(post);
        setIsCreatingPost(true);
    };

    const handleClose = () => {
        setEditData(undefined);
        setIsCreatingPost(false);
    };

    return (
        <PageContainer>
            <HeaderContainer>
                <PageTitle
                    title="Home Page"
                    subTitle="View and manage pinned announcements and links that appear to all users on the landing page"
                />
                <Button variant="filled" onClick={() => setIsCreatingPost(true)} data-testid="posts-create-post-v2">
                    <Plus /> New
                </Button>
            </HeaderContainer>
            <ListContainer>
                <PostList onEdit={handleEdit} />
            </ListContainer>
            {isCreatingPost && (
                <CreatePostModal
                    editData={editData as PostEntry}
                    onClose={handleClose}
                    onEdit={() => setTimeout(() => refetch(), 2000)}
                    onCreate={(urn, title, description) => {
                        addToListPostCache(
                            client,
                            {
                                urn,
                                properties: {
                                    title,
                                    description: description || null,
                                },
                            },
                            10,
                        );
                        setTimeout(() => refetch(), 2000);
                    }}
                />
            )}
        </PageContainer>
    );
}
