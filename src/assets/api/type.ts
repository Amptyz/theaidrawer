export class Image {
    src: string
    width: number
    height: number
    constructor(src: string, width: number, height: number) {
        this.src = src
        this.width = width
        this.height = height
    }
}
export interface drawRequest {
    /**
     * 重绘幅度（重绘幅度仅在img字段有传值的时候生效，重绘幅度越大代表生成图与原图越不相似，取值范围0~1）
     */
    denoisingStrength?: number | null;
    /**
     * 细节倍率（取值范围为1~9，默认5）
     */
    detailsLevel?: number | null;
    /**
     * 脸部修复开关（默认false)
     */
    faceFix?: boolean | null;
    /**
     * 生成图片高度（>= 64，<= 2048 默认值:512）
     */
    height?: number | null;
    /**
     * 高清化倍率（在文生图模式有效，取值范围为1~3之间）
     */
    hrScale?: number | null;
    /**
     * 高清处理步数（高清迭代步数，（不建议少于15，会严重影响画面生成效果 >= 5 <= 30）
     */
    hrSteps?: number | null;
    /**
     * 参考图片（生成参考图，此字段传值则代表模式为图生图，同时支持base64数据格式和url）
     */
    img?: null | string;
    /**
     * 图片高级功能参数
     */
    imgOptions?: ImgOption;
    /**
     * 蒙版边缘羽化值（>= 0 <= 100）
     */
    maskBlur?: number | null;
    /**
     * 黑白二值遮罩蒙版图（用于局部重绘处理）
     */
    maskImg?: null | string;
    /**
     * 指定要生成对应风格预设的图片(1 二次元 ，15 写实，853 q版，1811 高级动漫，1795 黏土）
     */
    modelStyleId?: number | null;
    /**
     * 负面词条（用于排除画面中要出现的内容描述，支持中英文描述）
     */
    negativePrompt?: null | string;
    /**
     * 描述画面中需要出现的内容，支持中英文描述
     */
    prompt?: null | string;
    /**
     * 随机种子（默认不传则随机）
     */
    seed?: number | null;
    /**
     * 是否生成花纹贴图（默认false)
     */
    tiling?: boolean | null;
    /**
     * 生成图片宽度（>= 64，<= 2048 默认值:512）
     */
    width?: number | null;
    [property: string]: any;
}

/**
 * 图片高级功能参数
 *
 * ImgOption
 */
export interface ImgOption {
    /**
     * 自动检测图片中的人脸（默认false）
     */
    facePreservation?: boolean | null;
    /**
     * 开启人脸保持后，画面中最多处理的人脸数量，默认为1，最大值可以为5
     */
    facePreservationCount?: number | null;
    /**
     * 性别识别（默认false)
     */
    genderDetect?: boolean | null;
    /**
     * 在最外层img参数没有传的时候，如果有传imgOptions的其他参数，则此img为必传，否则使用最外层img作为参考图
     */
    img?: null | string;
    /**
     * 重绘画面背景（默认false）
     */
    redrawBackground?: boolean | null;
    /**
     * 移除画面背景（默认false）
     */
    removeBackground?: boolean | null;
    [property: string]: any;
}