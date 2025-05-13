import { Pipe, PipeTransform } from "@angular/core";


@Pipe({
    name:'upperCasePipe',
})

export class UpperCasePipe implements PipeTransform{
    transform(value: string) {
        return value.toUpperCase();
    }
}