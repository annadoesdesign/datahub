import React, { useEffect, useState } from 'react';
import { message } from 'antd';
import { Pagination, SearchBar } from '@components';
import styled from 'styled-components/macro';
import { useListOwnershipTypesQuery } from '../../../graphql/ownership.generated';
import { Message } from '../../shared/Message';
import { OwnershipBuilderModal } from './OwnershipBuilderModal';
import { OwnershipTable } from './table/OwnershipTable';
import { OwnershipTypeEntity } from '../../../types.generated';

const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
`;

const SearchBarContainer = styled.div`
    display: flex;
    padding: 16px 0px 16px 0px;
`;

/**
 * This component renders a paginated, searchable list of Ownership Types.
 */
export const OwnershipList = () => {
    const [page, setPage] = useState(1);
    const [showOwnershipBuilder, setShowOwnershipBuilder] = useState<boolean>(false);
    const [ownershipType, setOwnershipType] = useState<undefined | OwnershipTypeEntity>(undefined);
    const [query, setQuery] = useState<undefined | string>(undefined);
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('*');

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchQuery(query || '*');
        }, 300);
        return () => clearTimeout(timer);
    }, [query]);
    /**
     * Queries
     */
    const pageSize = 10;
    const start: number = (page - 1) * pageSize;
    const { data, loading, error, refetch } = useListOwnershipTypesQuery({
        variables: {
            input: {
                start,
                count: pageSize,
                query: debouncedSearchQuery, // Changed from query to debouncedSearchQuery
            },
        },
    });

    const totalOwnershipTypes = data?.listOwnershipTypes?.total || 0;
    const ownershipTypes =
        data?.listOwnershipTypes?.ownershipTypes?.filter((type) => type.urn !== 'urn:li:ownershipType:none') || [];

    const onCloseModal = () => {
        setShowOwnershipBuilder(false);
        setOwnershipType(undefined);
    };

    return (
        <>
            {!data && loading && <Message type="loading" content="Loading Ownership Types..." />}
            {error &&
                message.error({
                    content: `Failed to load Ownership Types! An unexpected error occurred.`,
                    duration: 3,
                })}
            <SearchBarContainer>
                <SearchBar
                    placeholder="Search..."
                    value={query}
                    onChange={(e) => setQuery(e)}
                    data-testid="ownership-type-search-input"
                    width="280px"
                />
            </SearchBarContainer>
            <OwnershipTable
                ownershipTypes={ownershipTypes}
                setIsOpen={setShowOwnershipBuilder}
                setOwnershipType={setOwnershipType}
                refetch={refetch}
            />
            {totalOwnershipTypes >= pageSize && (
                <PaginationContainer>
                    <Pagination
                        currentPage={page}
                        itemsPerPage={pageSize}
                        totalPages={totalOwnershipTypes}
                        loading={loading}
                        onPageChange={(newPage) => setPage(newPage)}
                        showLessItems
                    />
                </PaginationContainer>
            )}
            <OwnershipBuilderModal
                isOpen={showOwnershipBuilder}
                onClose={onCloseModal}
                refetch={refetch}
                ownershipType={ownershipType}
            />
        </>
    );
};
