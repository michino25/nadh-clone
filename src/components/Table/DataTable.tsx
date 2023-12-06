import {
  SearchOutlined,
  EyeOutlined,
  CaretDownOutlined,
} from "@ant-design/icons";
import { Pagination, Button, Space, Table, Flex, Dropdown } from "antd";
import { iUser } from "../../utils/models";
import type { ColumnType, ColumnsType } from "antd/es/table";
import SearchInput from "./SearchInput";
import { changeCustomColumn, removeAllFilter } from "utils/filter";
import { getStore } from "utils/localStorage";
import { useState } from "react";
import SearchNumber from "./SearchNumber";
import { getColByKey } from "_constants/index";
import SearchSelect from "./SearchSelect";
import SearchDate from "./SearchDate";

type DataType = iUser;

interface DataTableProps {
  titleTable: string;
  tableName: string;
  refetch: () => void;
  data: any[];
  filterSelectData?: any;
  rawColumns: any[];
  createBtn: { handler: () => void; title: string } | undefined;
  showDetail: (id: string) => void;
  paginationOption?: {
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
  filterSelectData,
  rawColumns,
  showDetail,
  createBtn,
  paginationOption,
}) => {
  const getColumnSearchProps = (columnKey: string): ColumnType<DataType> => ({
    filterDropdown: () => (
      <>
        {!getColByKey(rawColumns, columnKey).type && (
          <SearchInput
            refetch={refetch}
            table={tableName}
            columnKey={columnKey}
          />
        )}

        {getColByKey(rawColumns, columnKey).type === "number" && (
          <SearchNumber
            refetch={refetch}
            table={tableName}
            columnKey={columnKey}
          />
        )}

        {getColByKey(rawColumns, columnKey).type === "select" && (
          <SearchSelect
            refetch={refetch}
            filterSelectData={filterSelectData}
            table={tableName}
            columnKey={columnKey}
          />
        )}

        {getColByKey(rawColumns, columnKey).type === "date" && (
          <SearchDate
            refetch={refetch}
            table={tableName}
            columnKey={columnKey}
          />
        )}
      </>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
  });

  const [render, setRender] = useState(true);

  const handleMenuSelect = ({ selectedKeys }: { selectedKeys: string[] }) => {
    console.log("Selected keys:", selectedKeys);
    changeCustomColumn(tableName, selectedKeys);
    setRender(!render);
  };

  const items = rawColumns.map((column: any) => ({
    key: column.key,
    label: column.title,
  }));

  let columns: ColumnsType<DataType> = [];
  if (Array.isArray(rawColumns)) {
    columns = rawColumns
      .filter((column) => getStore(tableName).col.includes(column.key))
      .map((column) => ({
        ...column,
        dataIndex: column.key,
        ...getColumnSearchProps(column.key),
        render: (data: any) => (
          <>
            {Array.isArray(data) ? (
              data.map((item, index) => (
                <p className="mb-1" key={index}>
                  {item}
                </p>
              ))
            ) : (
              <>{data}</>
            )}
          </>
        ),
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
            defaultSelectedKeys: getStore(tableName).col,
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

        <Button onClick={() => removeAllFilter(tableName, refetch)}>
          Clear filters
        </Button>
      </Flex>
    </Flex>
  );

  const footer = paginationOption && (
    <div className="flex justify-end">
      <Pagination
        current={getStore(tableName).page}
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
