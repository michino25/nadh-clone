import {
  SearchOutlined,
  EyeOutlined,
  CaretDownOutlined,
} from "@ant-design/icons";
import { Pagination, Button, Space, Table, Flex, Dropdown } from "antd";
import { useState } from "react";
import { iUser } from "../../utils/models";
import type { Key } from "antd/es/table/interface";
import type { ColumnType, ColumnsType } from "antd/es/table";
import SearchInput from "./SearchInput";

type DataType = iUser;

interface Column {
  key: string;
  title: string;
}

interface DataTableProps {
  titleTable: string;
  tableName: string;
  refetch: () => void;
  data: any[];
  rawColumns: Column[];
  createBtn: { handler: () => void; title: string } | undefined;
  showDetail: (id: string) => void;
  paginationOption?: {
    currentPage: number;
    handlePageChange: (page: number) => void;
    total: number;
    pageSize: number;
  };
}

const DataTable: React.FC<DataTableProps> = ({
  titleTable,
  tableName,
  refetch,
  data,
  rawColumns,
  showDetail,
  createBtn,
  paginationOption,
}) => {
  const getColumnSearchProps = (columnKey: string): ColumnType<DataType> => ({
    filterDropdown: () => (
      <SearchInput refetch={refetch} table={tableName} columnKey={columnKey} />
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
  });

  const [selectedKeys, setSelectedKeys] = useState<Key[] | string[]>(
    rawColumns.map((column: Column) => column.key)
  );

  const handleMenuSelect = ({
    selectedKeys,
  }: {
    selectedKeys: React.Key[];
  }) => {
    console.log("Selected keys:", selectedKeys);
    setSelectedKeys(selectedKeys);
  };

  const items = rawColumns.map((column: Column) => ({
    key: column.key,
    label: column.title,
  }));

  let columns: ColumnsType<DataType> = [];
  if (Array.isArray(rawColumns)) {
    columns = rawColumns
      .filter((column) => selectedKeys.includes(column.key))
      .map((column) => ({
        ...column,
        dataIndex: column.key,
        ...getColumnSearchProps(column.key),
      }));

    columns.push({
      title: "Action",
      key: "id",
      dataIndex: "id",
      render: (id: string) => (
        <button
          onClick={() => {
            showDetail(id);
          }}
        >
          <EyeOutlined />
        </button>
      ),
    });
  }

  const header = (
    <Flex justify="space-between">
      <span className="text-xl font-bold">
        {titleTable} ({paginationOption?.total})
      </span>

      <Flex gap="middle">
        {createBtn && (
          <Button onClick={createBtn.handler}>{createBtn.title}</Button>
        )}

        <Dropdown
          menu={{
            items,
            selectable: true,
            multiple: true,
            defaultSelectedKeys: selectedKeys as string[],
            onSelect: handleMenuSelect,
            onDeselect: handleMenuSelect,
          }}
        >
          <Button>
            <div className="flex items-center justify-center">
              <span className="pr-1">Custom Column</span>
              <CaretDownOutlined />
            </div>
          </Button>
        </Dropdown>

        <Button
        // onClick={clearFilters}
        >
          Clear filters
        </Button>
      </Flex>
    </Flex>
  );

  const footer = paginationOption && (
    <div className="flex justify-end">
      <Pagination
        current={paginationOption.currentPage}
        onChange={paginationOption.handlePageChange}
        total={paginationOption.total}
        pageSize={paginationOption.pageSize}
        showSizeChanger={false}
      />
    </div>
  );

  return (
    <>
      <Space
        style={{
          marginBottom: 16,
        }}
      ></Space>

      <Table
        className="w-full"
        title={() => header}
        footer={() => footer}
        scroll={{ x: true }}
        columns={columns}
        dataSource={data}
        pagination={false}
      />
    </>
  );
};
export default DataTable;
