type MetaData = {
  httpStatusCode: number;
  requestId: string;
  extendedRequestId: undefined;
  cfId: undefined;
  attempts: number;
  totalRetryDelay: number;
}

type AwsTextractResponse = {
  '$metadata': MetaData;
  AnalyzeDocumentModelVersion: string;
  Blocks?: Array<Block>
}

type Geometry = {
  BoundingBox: {
    Height: number;
    Left: number;
    Top: number;
    Width: number;
  },
  Polygon: Array<{
    X: number;
    Y: number;
  }>
}

type Relationships = {
  Ids: Array<string>;
  Type: string;
};

type Block = {
  BlockType: string;
  Geometry: Array<Geometry>;
  id: string;
  Relationships: Array<Relationships>;
  Confidence?: number;
  Text?: string;
}

export {
  AwsTextractResponse, Block,
  Geometry, MetaData, Relationships
};
