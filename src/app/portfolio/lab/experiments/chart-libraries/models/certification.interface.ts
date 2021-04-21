export interface CertificationList{
  result: boolean,
  data: {
    certificationlist: Certification[]
  }
}

export interface Certification{
  active?: string,
  categoryIdFirst?: string,
  certId: string,
  certName: string,
  certNameShort: string,
  keyword?: string,
  organization: string,
  summary: string,
  url: string,
}


export interface DateRange {
  range: string,
  begin: string,
  end: string
}


export interface MapchartData {
  result: boolean,
  data:{
    source: MapchartSource[],
    selectedCertification: string,
    begin: string,
    end: string
  }
}

export interface MapchartSource {
  stateNameShort: string,
  stateName: string,
  certNumbers: string
}


export interface UsaGeoData {
  type: string,
  features: UsaGeoFeature[]
}

export interface UsaGeoFeature {
  type: string,
  properties: {
    geo_id: string,
    state: string,
    name: string,
    lsad: string, 
    CENSUSAREA: number,
    certNumbers?: string,
    stateNameShort?: string
  },
  geometry: {
    type: string,
    coordinates: number[]
  }
}


export interface StatesData{
  result: boolean,
  data: {
    statelist: State[]
  }
}

export interface State{
  stateId: string,
  stateNameShort: string,
  stateCode: string,
  stateName: string
}

// Line chart
export interface LinechartData {
  result: boolean,
  data:{
    trends: LinechartSource[],
    certifications: Certification[],
    selectedState: string,
    begin: string,
    end: string,
    top: string
  }
}

export interface LinechartSource {
  importedDate: string,
  certName: string,
  certNameShort: string,
  certNumbers: string
}


// Bar chart
export interface BarchartData {
  result: boolean,
  data:{
    source: BarchartSource[],
    selectedState: string,
    begin: string,
    end: string,
    top: string
  }
}

export interface BarchartSource {
  certId: number|string,
  certName: string,
  certNameShort: string,
  certNumbers: number|string,
  organization: string,
  url: string,
  summary: string
}


export interface ContactFormData {
  name: string,
  email: string,
  subject: string,
  message: string,
  response: string
}